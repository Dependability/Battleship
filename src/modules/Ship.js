const Ship = (length) => {
    let hitAmount = 0;
    let sunk = false;
    
    function hit() {
        this.hitAmount++;
        if (this.hitAmount >= length) {
            this.sunk = true;
        }
    }

    function isSunk() {
        return this.sunk
    }
    
    
    return {length, hit, isSunk, hitAmount, sunk};
}

export default Ship;