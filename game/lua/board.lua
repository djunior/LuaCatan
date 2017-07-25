local BoardTile = require "lua.boardTile"
local LimitedValue = require"lua.limitedValue"
local Vertex = require"lua.vertex"
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
        tileNumber = 0            
    else
        tileNumber = getElementFromList(tileNumbers)[1]
        print("Tile number:",tileNumber)
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

local function createVertex(n)
    local vertexList = {}
    for i = 1, n do
        vertexList[i] = Vertex(3)
        print("Adding vertex index " .. tostring(i) .. ": " .. vertexList[i].tostring())
    end
    return vertexList
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

    local tileNumbers = {
        LimitedValue({2,1},1),
        LimitedValue({3,2},2),
        LimitedValue({4,3},2),
        LimitedValue({5,4},2),
        LimitedValue({6,5},2),
        LimitedValue({8,5},2),
        LimitedValue({9,4},2),
        LimitedValue({10,3},2),
        LimitedValue({11,2},2),
        LimitedValue({12,1},1),
    }

    local levels = levels or 3

    local numberOfTiles = 1
    for i = 1,(levels-1) do
        numberOfTiles = numberOfTiles + i*6
    end

    local board = { tiles = {} }

    local vertexList = createVertex(24)

    local tile1 = BoardTile(6)
    tile1.addVertex(vertexList[1])
    tile1.addVertex(vertexList[2])
    tile1.addVertex(vertexList[3])
    tile1.addVertex(vertexList[4])
    tile1.addVertex(vertexList[5])
    tile1.addVertex(vertexList[6])

    local tile2 = BoardTile(6)
    tile2.addVertex(vertexList[1])
    tile2.addVertex(vertexList[7])
    tile2.addVertex(vertexList[8])
    tile2.addVertex(vertexList[9])
    tile2.addVertex(vertexList[10])
    tile2.addVertex(vertexList[2])

    local tile3 = BoardTile(6)
    tile3.addVertex(vertexList[2])
    tile3.addVertex(vertexList[10])
    tile3.addVertex(vertexList[11])
    tile3.addVertex(vertexList[12])
    tile3.addVertex(vertexList[13])
    tile3.addVertex(vertexList[3])

    local tile4 = BoardTile(6)
    tile4.addVertex(vertexList[3])
    tile4.addVertex(vertexList[13])
    tile4.addVertex(vertexList[14])
    tile4.addVertex(vertexList[15])
    tile4.addVertex(vertexList[16])
    tile4.addVertex(vertexList[4])

    local tile5 = BoardTile(6)
    tile5.addVertex(vertexList[4])
    tile5.addVertex(vertexList[16])
    tile5.addVertex(vertexList[17])
    tile5.addVertex(vertexList[18])
    tile5.addVertex(vertexList[19])
    tile5.addVertex(vertexList[5])

    local tile6 = BoardTile(6)
    tile6.addVertex(vertexList[5])
    tile6.addVertex(vertexList[19])
    tile6.addVertex(vertexList[20])
    tile6.addVertex(vertexList[21])
    tile6.addVertex(vertexList[22])
    tile6.addVertex(vertexList[6])

    local tile7 = BoardTile(6)
    tile7.addVertex(vertexList[6])
    tile7.addVertex(vertexList[22])
    tile7.addVertex(vertexList[23])
    tile7.addVertex(vertexList[24])
    tile7.addVertex(vertexList[7])
    tile7.addVertex(vertexList[1])

    board.tiles[1] = createResourceTile(tileTypes,tileNumbers,tile1)
    board.tiles[2] = createResourceTile(tileTypes,tileNumbers,tile2)
    board.tiles[3] = createResourceTile(tileTypes,tileNumbers,tile3)
    board.tiles[4] = createResourceTile(tileTypes,tileNumbers,tile4)
    board.tiles[5] = createResourceTile(tileTypes,tileNumbers,tile5)
    board.tiles[6] = createResourceTile(tileTypes,tileNumbers,tile6)
    board.tiles[7] = createResourceTile(tileTypes,tileNumbers,tile7)

    board.getTiles = function ()
        local t = {}
        for i = 1, #board.tiles do
            t[i] = board.tiles[i].getSimpleObject()
        end
        return t
    end

    -- Level 1 tile
    -- local center = createTile()

    -- for i = 1,6 do
    --     if center.addVertex(Vertex(3)) then
    --         if #center.vertex > 1 then
    --             center.vertex[#center.vertex].connectTo(center.vertex[#center.vertex-1])
    --         end
    --     end
    -- end
    -- center.vertex[1].connectTo(center.vertex[#center.vertex])

    -- printVertex(center)

    -- Level 2 tiles

    -- for i = 1,6 do
    --     local tile = createTile()

        -- if #board.tiles == 1 then

            -- local vertex = board.tiles[1].vertex[i]

            -- tile.addVertex(vertex)

            -- local numberOfConnections = 0
            -- local vertexIndex = 1
            -- for j = 1,#vertex.edges do
            --     if #vertex.edges[j].edges < #vertex.edges[vertexIndex].edges then
            --         vertexIndex = j
            --     end
                
            -- end

            -- tile.addVertex(vertex.edges[vertexIndex])

            -- local newVertex = Vertex(3)

            -- newVertex.connectTo(vertex)

            -- tile.addVertex(newVertex)

            -- table.insert(board.tiles,tile)

            -- printVertex(tile)

        -- else

        -- end
    -- end





    -- createTile()
    -- for i = 1,numberOfTiles do
    --     table.insert(board.tiles,createTile())
    -- end

    return board
end

return Board