local function BoardTile(maxVertex)
    print("BoardTile - creating piece with maxVertex: " .. tostring(maxVertex)) 
    local maxVertex = maxVertex or 6
    
    local t = {}

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

    -- for i = 1, numberOfVertex do
    --     local v = Vertex(vertexConnection)
    --     if i > 1 then
    --         v.connectTo(t.vertex[i-1])
    --     end
    --     table.insert(t.vertex,v)
    -- end
    -- t.vertex[1].connectTo(t.vertex[#t.vertex])

    return t
end

return BoardTile