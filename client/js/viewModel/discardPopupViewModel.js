function ResourceLine(resource,maxNumber) {
    this.maxNumber = maxNumber;
    this.currentNumber = ko.observable(0);
    this.resourceName = resource;
    this.add = function() {
        if (this.currentNumber() < this.maxNumber)
        this.currentNumber(this.currentNumber+1);
    }
    this.remove = function() {
        if (this.currentNumber() > 0)
            this.currentNumber(this.currentNumber-1);
    }
}

function DiscardPopupViewModel() {

}

ko.applyBindings(new DiscardPopupViewModel());