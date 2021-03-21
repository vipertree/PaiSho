// Actuator

Undergrowth.Actuator = function(gameContainer, isMobile) {
	this.gameContainer = gameContainer;
	this.mobile = isMobile;

	var containers = setupPaiShoBoard(
		this.gameContainer, 
		Undergrowth.Controller.getHostTilesContainerDivs(),
		Undergrowth.Controller.getGuestTilesContainerDivs(), 
		false
	);

	this.boardContainer = containers.boardContainer;
	this.hostTilesContainer = containers.hostTilesContainer;
	this.guestTilesContainer = containers.guestTilesContainer;
}

Undergrowth.Actuator.prototype.actuate = function(board, theGame) {
	var self = this;

	window.requestAnimationFrame(function() {
		self.htmlify(board, theGame);
	});
};

Undergrowth.Actuator.prototype.htmlify = function(board, theGame) {
	this.clearContainer(this.boardContainer);

	var self = this;

	board.cells.forEach(function(column) {
		column.forEach(function(cell) {
			if (cell) {
				self.addBoardPoint(cell);
			}
		});
	});

	var fullTileSet = new Undergrowth.TileManager(true);

	// Go through tile piles and clear containers
	fullTileSet.hostTiles.forEach(function(tile) {
		self.clearTileContainer(tile);
	});
	fullTileSet.guestTiles.forEach(function(tile) {
		self.clearTileContainer(tile);
	});

	// Go through tile piles and display
	theGame.tileManager.hostTiles.forEach(function(tile) {
		self.addTile(tile, this.hostTilesContainer);
	});
	theGame.tileManager.guestTiles.forEach(function(tile) {
		self.addTile(tile, this.guestTilesContainer);
	});
};

Undergrowth.Actuator.prototype.clearContainer = function (container) {
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

Undergrowth.Actuator.prototype.clearTileContainer = function (tile) {
	var container = document.querySelector("." + tile.getImageName());
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

Undergrowth.Actuator.prototype.addTile = function(tile, mainContainer) {
	var self = this;

	var container = document.querySelector("." + tile.getImageName());

	var theDiv = document.createElement("div");

	theDiv.classList.add("point");
	theDiv.classList.add("hasTile");

	if (tile.selectedFromPile) {
		theDiv.classList.add("selectedFromPile");
		theDiv.classList.add("drained");
	}

	var theImg = document.createElement("img");
	
	var srcValue = getSkudTilesSrcPath();
	theImg.src = srcValue + tile.getImageName() + ".png";
	theDiv.appendChild(theImg);

	theDiv.setAttribute("name", tile.getImageName());
	theDiv.setAttribute("id", tile.id);

	if (this.mobile) {
		theDiv.setAttribute("onclick", "unplayedTileClicked(this); showTileMessage(this);");
	} else {
		theDiv.setAttribute("onclick", "unplayedTileClicked(this);");
		theDiv.setAttribute("onmouseover", "showTileMessage(this);");
		theDiv.setAttribute("onmouseout", "clearMessage();");
	}

	container.appendChild(theDiv);
};

Undergrowth.Actuator.prototype.addBoardPoint = function(boardPoint) {
	var self = this;

	var theDiv = createBoardPointDiv(boardPoint);
	
	if (!boardPoint.isType(NON_PLAYABLE)) {
		theDiv.classList.add("activePoint");
		if (boardPoint.isType(POSSIBLE_MOVE)) {
			theDiv.classList.add("possibleMove");
		} else if (boardPoint.betweenHarmony) {
			theDiv.classList.add("betweenHarmony");
			if (boardPoint.betweenHarmonyHost) {
				theDiv.classList.add("bhHost");
			}
			if (boardPoint.betweenHarmonyGuest) {
				theDiv.classList.add("bhGuest");
			}
		}
		
		if (this.mobile) {
			theDiv.setAttribute("onclick", "pointClicked(this); showPointMessage(this);");
		} else {
			theDiv.setAttribute("onclick", "pointClicked(this);");
			theDiv.setAttribute("onmouseover", "showPointMessage(this);");
			theDiv.setAttribute("onmouseout", "clearMessage();");
		}
	}

	if (boardPoint.hasTile()) {
		theDiv.classList.add("hasTile");
		
		var theImg = document.createElement("img");

		var srcValue = getSkudTilesSrcPath();
		theImg.src = srcValue + boardPoint.tile.getImageName() + ".png";
		
		if (boardPoint.tile.inHarmony) {
			theDiv.classList.add(HOST + "harmony");
		}
		if (boardPoint.tile.inClash) {
			theDiv.classList.add(GUEST + "harmony");
		}
		
		theDiv.appendChild(theImg);
	}

	this.boardContainer.appendChild(theDiv);

	if (boardPoint.betweenHarmony && boardPoint.col === 16) {
		var theBr = document.createElement("div");
		theBr.classList.add("clear");
		this.boardContainer.appendChild(theBr);
	}
};

