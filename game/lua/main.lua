local Board = require "lua.board"
local Dice = require"lua.dice"

local function PlayerFactory(maxPlayers)
    local playerCount = 0
    local maxPlayers = maxPlayers or 4

    local function Player (socket)
        playerCount = playerCount + 1
        local t = {
            id = playerCount,
            socket = socket,
            resources = {
                Ore = 0,
                Wheat = 0,
                Clay = 0,
                Sheep = 0,
                Wood = 0
            }
        }
        
        t.addResources = function(resourceList)
            if not resourceList or type(resourceList) ~= "table" then
                return
            end
            for k,v in pairs(resourceList) do
                if t.resources[k] then
                    t.resources[k] = t.resources[k] + v
                end
            end
        end

        return t
    end

    return {produce = Player}
end

local function Game(ws)
    local t = {}

    local dice1 = Dice(6)
    local dice2 = Dice(6)

    local board = Board(3)
    local PFactory = PlayerFactory(4)
    local players = {PFactory.produce(ws)}

    local function notifyPlayers(playerId,message)
        for i = 1,#players do
            if players[i].id ~= playerId then
                players[i].socket.send(message)
            end
        end
    end

    t.getTiles = function () return board.getTiles() end
    
    function t.addPlayer (socket) 
        table.insert(players,PFactory.produce(socket))
        return players[#players].id
    end

    function t.addElement(playerId, vertexId, elementType)
        board.addElement(playerId, vertexId, elementType)

        notifyPlayers(playerId,{
            command = "addElement",
            playerId = playerId,
            vertexId = vertexId,
            elementType = elementType,
        })
    end

    function t.rollDice(playerId)
        local d1 = dice1.roll()
        local d2 = dice2.roll()
        local sum = d1+d2
        local playerResources = {}

        if sum ~= 7 then
            playerResources = board.generateResources(sum)
        else
            for i = 1,#players do
                playerResources[players[i].id] = {}
            end
        end

        for i = 1,#players do
            players[i].addResources(playerResources[players[i].id])
            if players[i].id ~= playerId then
                players[i].socket.send({
                    command = "diceRolled",
                    firstDice = d1,
                    seondDice = d2,
                    resources = players[i].resources,
                })
            end
        end

        return {firstDice = d1, secondDice = d2, resources = players[playerId].resources}
    end

    return t,players[1].id
end

return Game

