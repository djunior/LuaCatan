math.randomseed(os.time())

RNG = {
    getRandomNumber = function (max)
        return math.random(1,max)
    end
}

return RNG
