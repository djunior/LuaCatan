local function ResourceTile(tileType, tileNumber, boardTile)
    local t = {}

    print("Resource tile:",tileNumber)
    t.tileType = tileType
    t.tileNumber = tileNumber
    t.boardTile = boardTile

    t.hasThief = false

    t.getSimpleObject = function()
        return {
            tileType = t.tileType,
            tileNumber = tostring(t.tileNumber),
            hasThief = t.hasThief,
            boardTile = t.boardTile.getSimpleObject(),
        }
    end

    return t
end

return ResourceTile