// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Pastebin {
    struct Paste {
        string content;
        address author;
        uint timestamp;
        uint id;
    }

    event NewPaste(
        string content,
        address indexed author,
        uint256 timestamp,
        uint256 indexed id
    );

    uint id = 0;
    uint public pasteCount;
    // Paste[] public pastes;
    mapping(uint => Paste) public pastes;

    function createPaste(string memory _content) public {
        require(bytes(_content).length > 0, "Content must not be empty.");
        pastes[id] = Paste(_content, msg.sender, block.timestamp, id);
        emit NewPaste(_content, msg.sender, block.timestamp, id);
        id++;
        pasteCount++;
    }

    function getPaste(
        uint256 _id
    ) public view returns (string memory, address, uint256) {
        Paste memory paste = pastes[_id];
        return (paste.content, paste.author, paste.timestamp);
    }

    function getAllPastes() public view returns (Paste[] memory) {
        Paste[] memory allPastes = new Paste[](pasteCount);
        for (uint i = 0; i <= pasteCount; i++) {
            allPastes[i] = pastes[i];
        }
        return (allPastes);
    }

    function findPasteIndexById(uint _id) internal view returns (int) {
        for (uint i = 0; i < pasteCount; i++) {
            if (pastes[i].id == _id) {
                return int(i);
            }
        }

        // If the paste is not found, return -1
        return int(-1);
    }

    // function removePaste(uint _id) public{
    //     int index = findPasteIndexById(_id);
    //     require(index >= 0, "Paste does not exist");
    //     delete pastes[_id];
    //     pastes[_id] =

    //     pasteCount--;
    // }
}
