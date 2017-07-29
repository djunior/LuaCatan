local Element = require"lua.element"

local function VertexFactory()
    local vertex_count = 0

    local function Vertex(maxEdges)
        vertex_count = vertex_count + 1
        local id = vertex_count
        local maxEdges = maxEdges or 3
        local t = {}
        t.id = id
        t.edges = {}
        t.maxEdges = maxEdges

        -- TODO: separate board vertex from game vertex, like board tile and resource tile
        t.roads = {}
        t.element = nil

        t.notifyConnection = function(v)
            if #t.edges == t.maxEdges then
                return false
            end

            if t.edges[v] then
                return false
            end

            table.insert(t.edges,v)
            t.edges[v] = #t.edges

            return true
        end

        t.connectTo = function(v)
            if t.notifyConnection(v) then
                v.notifyConnection(t)
            end
        end
        
        t.tostring = function() return "Vertex@" .. tostring(id) .. "{ numberOfEdges = " .. tostring(#t.edges) .. " }" end
        
        t.getSimpleObject = function ()
            local o = {
                id = id,
                connections = {},
                roads = {}
            }

            for i = 1,#t.edges do
                -- Se chamar t.edges[i].getSimpleObject aqui causar um loop infinito
                o.connections[i] = t.edges[i].id
            end

            if t.element then
                o.element = t.element.getSimpleObject()
            end
            
            for i = 1,#t.roads do
                o.roads[i] = t.roads[i].getSimpleObject()
            end

            return o
        end

        -- TODO: separate board vertex from game vertex, like board tile and resource tile        
        t.addElement = function(playerId,elementType)
            print("Adding element " .. tostring(elementType) .. " to player " .. tostring(playerId))
            t.element = Element(playerId,elementType)
        end

        t.addRoad = function (road)
            t.roads[#t.roads+1] = road
        end

        return t
    end
    return {produce = Vertex}
end

return VertexFactory