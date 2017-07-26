local BoardTileFactory = require "lua.boardTile"
local LimitedValue = require"lua.limitedValue"
local VertexFactory = require"lua.vertex"
local ResourceTile = require"lua.resourceTile"

math.randomseed(os.time())

local function getRandomElement(elegibleElements)
    local index = math.random(1,#elegibleElements)
    -- print("Random index:",index)
    return elegibleElements[index]
end

local function getElementFromList(list)
    local t = {}
    for i,p in ipairs(list) do
        if p.uses < p.limit then
            table.insert(t,p)
        end
    end
    local p = getRandomElement(t)
    p.uses = p.uses + 1
    return p.value
end

local function createResourceTile(tileTypes,tileNumbers,boardTile)
    local tileType = getElementFromList(tileTypes)
    -- print("Tile type:",tileType)
    local tileNumber 
    if tileType == "Desert" then
        tileNumber = {number = 0, stars = 0}
    else
        tileNumber = getElementFromList(tileNumbers)
    end

    return ResourceTile(tileType,tileNumber,boardTile)
end

local function printVertex(tile)
    print("Printing tile " .. tile.tostring())
    for _,v in ipairs(tile.vertex) do
        local c =  ""
        for _,v2 in ipairs(v.edges) do
            c = c .. " " .. v2.tostring()
        end
        print(v.tostring() .. " connections:" .. c)
    end
end

local function Board(levels)

    local tileTypes = {
        LimitedValue("Ore",3),
        LimitedValue("Clay",3),
        LimitedValue("Wheat",4),
        LimitedValue("Wood",4),
        LimitedValue("Sheep",4),
        LimitedValue("Desert",1),
    }

    local function TileNumber(n,s)
        return {number = n, stars = s}
    end

    local tileNumbers = {
        LimitedValue(TileNumber(2,1),1),
        LimitedValue(TileNumber(3,2),2),
        LimitedValue(TileNumber(4,3),2),
        LimitedValue(TileNumber(5,4),2),
        LimitedValue(TileNumber(6,5),2),
        LimitedValue(TileNumber(8,5),2),
        LimitedValue(TileNumber(9,4),2),
        LimitedValue(TileNumber(10,3),2),
        LimitedValue(TileNumber(11,2),2),
        LimitedValue(TileNumber(12,1),1),
    }

    local VFactory = VertexFactory()
    local BFactory = BoardTileFactory()

    local levels = levels or 3

    local numberOfTiles = 1
    for i = 1,(levels-1) do
        numberOfTiles = numberOfTiles + i*6
    end

    local board = { tiles = {} }

    local function createVertex(n)
        local vertexList = {}
        for i = 1, n do
            vertexList[i] = VFactory.produce(3)
        end
        return vertexList
    end

    local vertexList = createVertex(54)

    local function createBoadTile(indexList)
        local tile = BFactory.produce(6)
        for i = 1,#indexList do
            tile.addVertex(vertexList[indexList[i]])

            -- vertexToTile[vertexList[indexList[i]]] = vertexToTile[vertexList[indexList[i]]] or {}
            -- table.insert(vertexToTile[vertexList[indexList[i]]],tile)
        end
        return tile
    end

    local vertexMap = {
        -- Central tile
        {1,2,3,4,5,6},

        -- Inner circle
        {8,9,10,2,1,7}, -- 2
        {10,11,12,13,3,2}, -- 3
        {3,13,14,15,16,4}, -- 4
        {5,4,16,17,18,19}, -- 5
        {22,6,5,19,20,21}, -- 6
        {24,7,1,6,22,23}, -- 7

        -- Outer circle
        {26,27,8,7,24,25}, -- 8
        {28,29,30,9,8,27}, -- 9
        {30,31,32,11,10,9}, -- 10
        {32,33,34,35,12,11}, -- 11
        {12,35,36,37,14,13}, -- 12
        {14,37,38,39,40,15}, -- 13
        {16,15,40,41,42,17}, -- 14 
        {18,17,42,43,44,45}, -- 15
        {20,19,18,45,46,47}, -- 16
        {50,21,20,47,48,49}, -- 17
        {52,23,22,21,50,51}, -- 18
        {54,25,24,23,52,53}, -- 19
    }

    for i = 1,#vertexMap do
        board.tiles[i] = createResourceTile(tileTypes,tileNumbers,createBoadTile(vertexMap[i]))
    end

    board.getTiles = function ()
        local t = {}
        for i = 1, #board.tiles do
            t[i] = board.tiles[i].getSimpleObject()
        end
        return t
    end

    board.addElement = function (playerId, vertexId, elementType)
        vertexList[vertexId].addElement(playerId,elementType)
    end
    
    return board
end

return Board