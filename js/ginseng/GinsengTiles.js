
Ginseng.TileCodes = {
	WhiteLotus: "L",
	Koi: "K",
	Badgermole: "B",
	Dragon: "D",
	Bison: "FB",
	LionTurtle: "LT",
	Ginseng: "G",
	Orchid: "O",
	Wheel: "W"
};

Ginseng.TileType = {
	originalBender: "originalBender"
};

Ginseng.TilePileNames = {
	banish: "banish"
};

Ginseng.GinsengTiles = {};
Ginseng.TileInfo = {};

Ginseng.TileInfo.initializeTrifleData = function() {
	Trifle.TileInfo.initializeTrifleData();

	Ginseng.TileInfo.defineGinsengTiles();
};

Ginseng.TileInfo.defineGinsengTiles = function() {
	var GinsengTiles = {};

	GinsengTiles[Ginseng.TileCodes.WhiteLotus] = {
		available: true,
		types: [Ginseng.TileCodes.WhiteLotus],
		movements: [
			{
				type: Trifle.MovementType.jumpSurroundingTiles,
				jumpDirections: [Trifle.MovementDirection.diagonal],
				targetTeams: [Trifle.TileTeam.friendly, Trifle.TileTeam.enemy],
				distance: 99
			}
		],
		abilities: [
			{
				title: "Harmony",
				type: Trifle.AbilityName.protectFromCapture,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whileTargetTileIsInLineOfSight,
						targetTeams: [Trifle.TileTeam.friendly],
						targetTileCodes: [Ginseng.TileCodes.Ginseng]
					}
				],
				targetTypes: [Trifle.TargetType.thisTile]
			},
			{
				title: "Remember Start Point",
				type: Trifle.AbilityName.recordTilePoint,
				priority: Trifle.AbilityPriorityLevel.highest,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenDeployed,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				recordTilePointType: Trifle.RecordTilePointType.startPoint
			},
			{
				type: Trifle.AbilityName.moveTileToRecordedPoint,
				priority: Trifle.AbilityPriorityLevel.highest,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenCapturedByTargetTile,
						targetTileTypes: [Trifle.TileCategory.allTileTypes]
					}
				],
				targetTypes: [Trifle.TargetType.thisTile],
				recordedPointType: Trifle.RecordTilePointType.startPoint
			}
		]
	};

	GinsengTiles[Ginseng.TileCodes.Koi] = {
		available: true,
		types: [Ginseng.TileType.originalBender],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 5,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.immobilizeTiles,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whileTargetTileIsSurrounding,
						targetTeams: [Trifle.TileTeam.enemy],
						targetTileTypes: [Trifle.TileCategory.allTileTypes],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [WHITE]
							}
						]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles]
			}
		]/* ,
		textLines: [
			"Koi | Original Bender"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Dragon] = {
		available: true,
		types: [Ginseng.TileType.originalBender],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 5,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.captureTargetTiles,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenLandsSurroundingTargetTile,
						targetTeams: [Trifle.TileTeam.enemy],
						targetTileTypes: [Trifle.TileCategory.allTileTypes],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [RED]
							}
						]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				triggerTypeToTarget: Trifle.AbilityTriggerType.whenLandsSurroundingTargetTile
			}
		]/* ,
		textLines: [
			"Dragon | Original Bender"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Badgermole] = {
		available: true,
		types: [Ginseng.TileType.originalBender],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 5,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.protectFromCapture,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whileTargetTileIsSurrounding,
						targetTeams: [Trifle.TileTeam.friendly],
						targetTileTypes: [Trifle.TileCategory.allTileTypes],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [WHITE]
							}
						]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles]
			},
			{
				title: "Protect From Enemy Abilities",
				type: Trifle.AbilityName.cancelAbilitiesTargetingTiles,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whileTargetTileIsSurrounding,
						targetTeams: [Trifle.TileTeam.friendly],
						targetTileTypes: [Trifle.TileCategory.allTileTypes],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [WHITE]
							}
						]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				targetAbilityTypes: [Trifle.AbilityType.all],
				cancelAbilitiesFromTeam: Trifle.TileTeam.enemy
			}
		]/* ,
		textLines: [
			"Badgermole | Original Bender"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Bison] = {
		available: true,
		types: [Ginseng.TileType.originalBender],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 5,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				title: "Active Bison Push",
				type: Trifle.AbilityName.moveTargetTile,
				isPassiveMovement: true,
				optional: true,
				promptForTargets: true,	// This line not needed?
				neededPromptTargetsInfo: [
					{
						title: "pushedTile",
						promptId: Trifle.TargetPromptId.movedTilePoint,
						targetType: Trifle.PromptTargetType.boardPoint
					},
					{
						title: "pushLanding",
						promptId: Trifle.TargetPromptId.movedTileDestinationPoint,
						targetType: Trifle.PromptTargetType.boardPoint
					}
				],
				priority: Trifle.AbilityPriorityLevel.highest,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenLandsSurroundingTargetTile,
						targetTileTypes: [Trifle.TileCategory.allTileTypes],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [RED]
							}
						]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				triggerTypeToTarget: Trifle.AbilityTriggerType.whenLandsSurroundingTargetTile,
				numberOfTargetTiles: 1,
				promptTargetTitle: "pushedTile",
				targetTileMovements: [
					{
						type: Trifle.MovementType.awayFromTargetTileOrthogonal,
						distance: 2,
						targetTileTypes: [Trifle.TileCategory.tileWithAbility]
					},
					{
						type: Trifle.MovementType.awayFromTargetTileDiagonal,
						distance: 1,
						targetTileTypes: [Trifle.TileCategory.tileWithAbility]
					}
				]
			},
			{
				title: "Passive Bison Push",
				type: Trifle.AbilityName.moveTargetTile,
				isPassiveMovement: true,
				optional: true,
				promptForTargets: true,
				neededPromptTargetsInfo: [
					{
						title: "pushedTile",
						promptId: Trifle.TargetPromptId.movedTilePoint,
						targetType: Trifle.PromptTargetType.boardPoint
					},
					{
						title: "pushLanding",
						promptId: Trifle.TargetPromptId.movedTileDestinationPoint,
						targetType: Trifle.PromptTargetType.boardPoint
					}
				],
				priority: Trifle.AbilityPriorityLevel.highest,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenTargetTileLandsSurrounding,
						targetTeams: [Trifle.TileTeam.friendly],
						activationRequirements: [
							{
								type: Trifle.ActivationRequirement.tileIsOnPointOfType,
								targetTileTypes: [Trifle.TileCategory.thisTile],
								targetPointTypes: [RED]
							}
						]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement,
						targetTileTypes: [Trifle.TileCategory.allTileTypes]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				triggerTypeToTarget: Trifle.AbilityTriggerType.whenTargetTileLandsSurrounding,
				numberOfTargetTiles: 1,
				promptTargetTitle: "pushedTile",
				targetTileMovements: [
					{
						type: Trifle.MovementType.awayFromTargetTileOrthogonal,
						distance: 2,
						targetTileTypes: [Trifle.TileCategory.tileWithAbility]
					},
					{
						type: Trifle.MovementType.awayFromTargetTileDiagonal,
						distance: 1,
						targetTileTypes: [Trifle.TileCategory.tileWithAbility]
					}
				]
			}
		]/* ,
		textLines: [
			"Bison | Original Bender"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.LionTurtle] = {
		available: true,
		types: [Ginseng.TileCodes.LionTurtle],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 6,
				captureTypes: [
					{
						type: Trifle.CaptureType.allExcludingCertainTiles,
						excludedTileCodes: [Ginseng.TileCodes.LionTurtle]
					}
				],
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.captureTargetTiles,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenLandsAdjacentToTargetTile,
						targetTeams: [Trifle.TileTeam.enemy],
						targetTileTypes: [Ginseng.TileType.originalBender]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					}
				],
				targetTypes: [Trifle.TargetType.triggerTargetTiles],
				triggerTypeToTarget: Trifle.AbilityTriggerType.whenLandsAdjacentToTargetTile
			}
		]/* ,
		textLines: [
			"Lion Turtle"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Wheel] = {
		available: true,
		types: [Trifle.TileType.traveler],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 99,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				],
				restrictions: [
					{
						type: Trifle.MovementRestriction.mustPreserveDirection
					}
				]
			}
		]/* ,
		textLines: [
			"Wheel"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Ginseng] = {
		available: true,
		types: [Trifle.TileType.flower],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 60,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.exchangeWithCapturedTile,
				optional: true,
				neededPromptTargetsInfo: [
					{
						title: "exchangedTile",
						promptId: Trifle.TargetPromptId.chosenCapturedTile,
						targetType: Trifle.PromptTargetType.capturedTile
					}
				],
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenTargetTileLandsInTemple,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement,
						targetTileTypes: [Trifle.TileCategory.thisTile]
					}
				],
				targetTypes: [Trifle.TargetType.chosenCapturedTile],
				targetTeams: [Trifle.TileTeam.friendly],
				promptTargetTitle: "exchangedTile"
			}
		]
		/* ,
		textLines: [
			"Ginseng"
		] */
	};

	GinsengTiles[Ginseng.TileCodes.Orchid] = {
		available: true,
		types: [Trifle.TileType.flower],
		movements: [
			{
				type: Trifle.MovementType.standard,
				distance: 5,
				captureTypes: [
					{
						type: Trifle.CaptureType.all
					}
				]
			}
		],
		abilities: [
			{
				type: Trifle.AbilityName.moveTargetTileToPile,
				destinationPile: Ginseng.TilePileNames.banish,
				triggers: [
					{
						triggerType: Trifle.AbilityTriggerType.whenCapturingTargetTile,
						targetTeams: [Trifle.TileTeam.enemy]
					},
					{
						triggerType: Trifle.AbilityTriggerType.whenActiveMovement
					}
				],
				targetTypes: [
					Trifle.TargetType.triggerTargetTiles,
					Trifle.TargetType.thisTile
				],
				triggerTypeToTarget: Trifle.AbilityTriggerType.whenCapturingTargetTile
			}
		]
		/* ,
		textLines: [
			"Orchid"
		] */
	};

	/* Apply Capture and Ability Activation Requirements Rules */
	Ginseng.applyCaptureAndAbilityActivationRequirementRules(GinsengTiles);

	Ginseng.GinsengTiles = GinsengTiles;
};

Ginseng.applyCaptureAndAbilityActivationRequirementRules = function(GinsengTiles) {
	Object.keys(GinsengTiles).forEach(function(key, index) {
		var tileInfo = GinsengTiles[key];
		if (tileInfo.movements && tileInfo.movements.length) {
			tileInfo.movements.forEach(function(movementInfo) {
				if (movementInfo.captureTypes && movementInfo.captureTypes.length) {
					movementInfo.captureTypes.forEach(function(captureTypeInfo) {
						var activationRequirement = {
							type: Trifle.ActivationRequirement.tilesNotInTemple,
							targetTileCodes: [Ginseng.TileCodes.WhiteLotus],
							targetTeams: [Trifle.TileTeam.friendly, Trifle.TileTeam.enemy]
						};
						if (captureTypeInfo.activationRequirements) {
							captureTypeInfo.activationRequirements.push(activationRequirement);
						} else {
							captureTypeInfo["activationRequirements"] = [activationRequirement];
						}
					});
				}
			});
		}

		if (tileInfo.abilities && tileInfo.abilities.length) {
			tileInfo.abilities.forEach(function(abilityInfo) {
				if (abilityInfo.type !== Trifle.AbilityName.recordTilePoint 
						&& abilityInfo.triggers && abilityInfo.triggers.length) {
					abilityInfo.triggers.forEach(function(triggerInfo) {
						var triggerActivationRequirement = {
							type: Trifle.ActivationRequirement.tilesNotInTemple,
							targetTileCodes: [Ginseng.TileCodes.WhiteLotus],
							targetTeams: [Trifle.TileTeam.friendly]
						};
						if (triggerInfo.activationRequirements) {
							triggerInfo.activationRequirements.push(triggerActivationRequirement);
						} else {
							triggerInfo["activationRequirements"] = [triggerActivationRequirement];
						}
					});
				}
			});
		}
	});
};
