module.exports = {
    truncate: function (string, width) {
        string = string.replace(/[\s\r\n]+/, ' ');
        if (string.length >= width) {
            return string[width - 1] === ' ' ? string.substr(0, width - 1) : string.substr(0, string.substr(0, width).lastIndexOf(' '));
        }
        return string;
    },
    whole: function (string, width) {
        arr = [];
        string = string.replace(/[\s\r\n]+/, ' ');
        var b = 0;
        while (b < string.length) {
            arr.push(this.truncate(string.substring(b), width));
            b += arr[arr.length - 1].length;
        }
        return arr;
    }
}