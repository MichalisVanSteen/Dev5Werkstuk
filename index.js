function checkStringLength(str) {
    return str && typeof str == "string" && str.length <= 10 ? str : false; 
}

module.exports = checkStringLength;