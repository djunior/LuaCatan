local function RoadFactory()
    local road_count = 0;
    local function Road(playerId)
        road_count = road_count + 1
        local t = {}
        t.playerId = playerId
        t.id = road_count
        t.getSimpleObject = function () 
            return {playerId = t.playerId, id = t.id} 
        end
        return t
    end

    return {produce = Road}
end

return RoadFactory