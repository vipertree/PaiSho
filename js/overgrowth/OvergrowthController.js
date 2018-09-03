/* Overgrowth Pai Sho specific UI interaction logic */

function OvergrowthController(gameContainer, isMobile) {
	this.actuator = new OvergrowthActuator(gameContainer, isMobile);

	this.showGameMessageUnderneath = true;

	this.resetGameNotation();	// First

	this.resetGameManager();
	this.resetNotationBuilder();

	this.drawnTile = null;
	this.lastDrawnTile = null; // Save for Undo

	this.drawRandomTile();
}

OvergrowthController.prototype.getGameTypeId = function() {
	return GameType.OvergrowthPaiSho.id;
};

OvergrowthController.prototype.completeSetup = function() {
	this.callActuate();
};

OvergrowthController.prototype.drawRandomTile = function() {
	this.lastDrawnTile = this.drawnTile;
	this.drawnTile = this.theGame.drawRandomTile(this.getCurrentPlayer());
};

OvergrowthController.prototype.resetGameManager = function() {
	this.theGame = new OvergrowthGameManager(this.actuator);
};

OvergrowthController.prototype.resetNotationBuilder = function() {
	this.notationBuilder = new OvergrowthNotationBuilder();
};

OvergrowthController.prototype.resetGameNotation = function() {
	this.gameNotation = this.getNewGameNotation();
};

OvergrowthController.prototype.getNewGameNotation = function() {
	return new OvergrowthGameNotation();
};

OvergrowthController.getHostTilesContainerDivs = function() {
	return '<div class="HR3 HR4 HR5 HW3 HW4 HW5 HR HW HK HB HL HO">';
}

OvergrowthController.getGuestTilesContainerDivs = function() {
	return '<div class="GR3 GR4 GR5 GW3 GW4 GW5 GR GW GK GB GL GO">';
};

OvergrowthController.prototype.callActuate = function() {
	// if tilemanager doesn't have drawnTile, draw tile?
	if (this.drawnTile) {
		var tile = this.theGame.tileManager.peekTile(this.getCurrentPlayer(), this.drawnTile.code, this.drawnTile.id);
		if (!tile) {
			this.drawnTile = null;
			this.lastDrawnTile = null; // Save for Undo

			this.drawRandomTile();
		}
	}

	this.theGame.actuate();
};

OvergrowthController.prototype.resetMove = function() {
	// Remove last move
	this.gameNotation.removeLastMove();

	if (this.drawnTile) {
		this.drawnTile.selectedFromPile = false;
		this.theGame.tileManager.putTileBack(this.drawnTile);
	}

	this.drawnTile = this.lastDrawnTile;
	this.drawnTile.selectedFromPile = false;
};

OvergrowthController.prototype.getDefaultHelpMessageText = function() {
	return "<h4>Overgrowth Pai Sho</h4> <p>A competitive variant of Solitaire Pai Sho.</p>";
};

OvergrowthController.prototype.getAdditionalMessage = function() {
	var msg = "";
	if (!this.theGame.getWinner()) {
		msg += "<br /><strong>" + this.theGame.getScoreSummary() + "</strong>";
	}
	return msg;
};

OvergrowthController.prototype.unplayedTileClicked = function(tileDiv) {
	if (!myTurn()) {
		return;
	}
	if (currentMoveIndex !== this.gameNotation.moves.length) {
		debug("Can only interact if all moves are played.");
		return;
	}

	var divName = tileDiv.getAttribute("name");	// Like: GW5 or HL
	var tileId = parseInt(tileDiv.getAttribute("id"));
	var playerCode = divName.charAt(0);
	var tileCode = divName.substring(1);

	var player = GUEST;
	if (playerCode === 'H') {
		player = HOST;
	}

	var tile = this.theGame.tileManager.peekTile(player, tileCode, tileId);

	if (this.notationBuilder.status === BRAND_NEW) {
		tile.selectedFromPile = true;
		this.drawnTile.selectedFromPile = true;

		this.notationBuilder.moveType = PLANTING;
		this.notationBuilder.plantedFlowerType = tileCode;
		this.notationBuilder.status = WAITING_FOR_ENDPOINT;

		this.theGame.setAllLegalPointsOpen(getCurrentPlayer(), tile);
	} else {
		this.theGame.hidePossibleMovePoints();
		this.notationBuilder = new OvergrowthNotationBuilder();
	}
};

OvergrowthController.prototype.pointClicked = function(htmlPoint) {
	if (currentMoveIndex !== this.gameNotation.moves.length) {
		debug("Can only interact if all moves are played.");
		return;
	}

	var npText = htmlPoint.getAttribute("name");

	var notationPoint = new NotationPoint(npText);
	var rowCol = notationPoint.rowAndColumn;
	var boardPoint = this.theGame.board.cells[rowCol.row][rowCol.col];

	if (this.notationBuilder.status === WAITING_FOR_ENDPOINT) {
		if (boardPoint.isType(POSSIBLE_MOVE)) {
			// They're trying to move there! And they can! Exciting!
			// Need the notation!
			this.theGame.hidePossibleMovePoints();
			this.notationBuilder.endPoint = new NotationPoint(htmlPoint.getAttribute("name"));
			
			var move = this.gameNotation.getNotationMoveFromBuilder(this.notationBuilder);
			this.theGame.runNotationMove(move);

			// Move all set. Add it to the notation!
			this.gameNotation.addMove(move);
			this.drawRandomTile();
			if (onlinePlayEnabled && this.gameNotation.moves.length === 1) {
				createGameIfThatIsOk(GameType.OvergrowthPaiSho.id);
			} else {
				if (playingOnlineGame()) {
					callSubmitMove();
				} else {
					finalizeMove();
				}
			}
		} else {
			this.theGame.hidePossibleMovePoints();
			this.notationBuilder = new OvergrowthNotationBuilder();
		}
	}
};

OvergrowthController.prototype.getTileMessage = function(tileDiv) {
	var divName = tileDiv.getAttribute("name");	// Like: GW5 or HL
	var tileId = parseInt(tileDiv.getAttribute("id"));

	var tile = new OvergrowthTile(divName.substring(1), divName.charAt(0));

	var message = [];

	var ownerName = HOST;
	if (divName.startsWith('G')) {
		ownerName = GUEST;
	}
	
	var tileCode = divName.substring(1);

	var heading = OvergrowthTile.getTileName(tileCode);

	return {
		heading: heading,
		message: message
	}
}

OvergrowthController.prototype.getPointMessage = function(htmlPoint) {
	var npText = htmlPoint.getAttribute("name");

	var notationPoint = new NotationPoint(npText);
	var rowCol = notationPoint.rowAndColumn;
	var boardPoint = this.theGame.board.cells[rowCol.row][rowCol.col];

	var message = [];
	if (boardPoint.hasTile()) {
		message.push(toHeading(boardPoint.tile.getName()));
	} else {
		if (boardPoint.isType(NEUTRAL)) {
			message.push(getNeutralPointMessage());
		} else if (boardPoint.isType(RED) && boardPoint.isType(WHITE)) {
			message.push(getRedWhitePointMessage());
		} else if (boardPoint.isType(RED)) {
			message.push(getRedPointMessage());
		} else if (boardPoint.isType(WHITE)) {
			message.push(getWhitePointMessage());
		} else if (boardPoint.isType(GATE)) {
			message.push(getNeutralPointMessage());
		}
	}

	return {
		heading: null,
		message: message
	}
}

OvergrowthController.prototype.playAiTurn = function(finalizeMove) {
	// 
};

OvergrowthController.prototype.startAiGame = function(finalizeMove) {
	// 
};

OvergrowthController.prototype.getAiList = function() {
	return [];
}

OvergrowthController.prototype.getCurrentPlayer = function() {
	if (this.gameNotation.moves.length % 2 === 0) {
		return HOST;
	} else {
		return GUEST;
	}
};

OvergrowthController.prototype.cleanup = function() {
	// 
};

OvergrowthController.prototype.isSolitaire = function() {
	return false;
};

OvergrowthController.prototype.setGameNotation = function(newGameNotation) {
	if (this.drawnTile) {
		this.drawnTile.selectedFromPile = false;
		this.theGame.tileManager.putTileBack(this.drawnTile);
	}
	this.resetGameManager();
	this.gameNotation.setNotationText(newGameNotation);
	this.drawRandomTile();
	this.theGame.actuate();
};
