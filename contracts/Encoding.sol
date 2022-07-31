//SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Encoding {
    function concatStrings() public pure returns (string memory) {
        return string(abi.encodePacked("Hello ", "Marcos"));
    }

    function encodeNumber() public pure returns (bytes memory) {
        bytes memory number = abi.encode(1);
        return number;
    }

    function encodeString() public pure returns (bytes memory) {
        bytes memory aString = abi.encode("Hello marcos");
        return aString;
    }

    function encodeStringPacked() public pure returns (bytes memory) {
        bytes memory aString = abi.encodePacked("Hello marcos");
        return aString;
    }

    function decodeString() public pure returns (string memory) {
        string memory aString = abi.decode(encodeString(), (string));
        return aString;
    }

    function multiEncode() public pure returns (bytes memory) {
        bytes memory aString = abi.encode("Hello marcos", "how are you?");
        return aString;
    }

    function multiDecode() public pure returns (string memory, string memory) {
        (string memory aString, string memory anotherString) = abi.decode(
            multiEncode(),
            (string, string)
        );
        return (aString, anotherString);
    }
}
