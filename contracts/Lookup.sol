// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Lookup {
    mapping(string => People) public idToPeople;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    string[] public peopleLUT;

    function addPerson(
        string calldata id,
        string calldata _name,
        uint256 _favoriteNumber
    ) public {
        peopleLUT.push(id);
        idToPeople[id] = People(_favoriteNumber, _name);
    }

    function test() public {
        /*
            idToPeople { 
                "123-ABC" {"Jhon", 7}
                "456-DEF", {"Harry", 2}
            }
        */
        People memory pMem = idToPeople["123-ABC"];
        pMem.favoriteNumber = 1;
        /*
            idToPeople { 
                "123-ABC" {"Jhon", 7}
                "456-DEF", {"Harry", 2}
            }

            pMem:{{"Jhon", 1}}
        */
        People storage pStor = idToPeople["123-ABC"];
        pStor.favoriteNumber = 1;
        /*
            idToPeople { 
                "123-ABC" {"Jhon", 1}
                "456-DEF", {"Harry", 2}
            }
        */
    }
}
