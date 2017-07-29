local function Element(playerId, elementType)
    local t = {playerId = playerId, elementType = elementType}
    t.produceResource = function ()
        if t.elementType == "village" then
            return 1
        elseif t.elementType == "city" then
            return 2
        end
        return 0
    end
    t.getSimpleObject = function ()
        return {playerId = t.playerId, elementType = t.elementType}
    end
    return t
end

return Element