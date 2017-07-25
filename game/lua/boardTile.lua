local function BoardTileFactory()
    local tileCount = 0
    local function BoardTile(maxVertex)
        print("BoardTile - creating piece with maxVertex: " .. tostring(maxVertex)) 
        local maxVertex = maxVertex or 6
        
        tileCount = tileCount + 1

        local t = {}

        t.id = tileCount

        t.vertex = {}
        
        t.tostring = function() return "BoardTile@" .. tostring(t):gsub("table: ","") .. " { numberOfVertex = " .. tostring(#t.vertex) .. "}" end

        t.addVertex = function (v)

            if #t.vertex == maxVertex then  
                return false
            end

            t.vertex[#t.vertex+1] = v

            if #t.vertex > 1 then
                t.vertex[#t.vertex].connectTo(t.vertex[#t.vertex-1])
            end

            if #t.vertex == maxVertex then
                t.vertex[#t.vertex].connectTo(t.vertex[1])
            end

            return true
        end

        t.getSimpleObject = function ()
            local o = {
                id = t.id,
                vertex = {}
            }
            for i = 1,#t.vertex do
                o.vertex[i] = t.vertex[i].getSimpleObject()
            end
            return o
        end

        return t
    end

    return {produce = BoardTile}
end


return BoardTileFactory