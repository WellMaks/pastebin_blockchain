const Pastebin = artifacts.require("Pastebin");
const assert = require("assert");

contract("Pastebin", (accounts) => {
  const USER = accounts[1];
  const CONTENT = "Hello, world!";

  it("should create a pastebin", async () => {
    const instance = await Pastebin.deployed();

    let initialCount = await instance.pasteCount.call();
    assert.equal(initialCount.toNumber(), 0, "initial paste count is not 0");

    let tx = await instance.createPaste(CONTENT, { from: USER });

    assert.equal(tx.logs.length, 1, "an event was not triggered");
    assert.equal(tx.logs[0].event, "NewPaste", "the event type is not correct");
    assert.equal(
      tx.logs[0].args.content,
      CONTENT,
      "the paste content is not correct"
    );
    assert.equal(tx.logs[0].args.author, USER, "the author is not correct");

    // Validate paste count after paste creation
    let finalCount = await instance.pasteCount.call();
    assert.equal(finalCount.toNumber(), 1, "final paste count is not 1");
  });

  it("should retrieve a paste", async () => {
    const instance = await Pastebin.deployed();

    // Check paste data
    let pasteData = await instance.getPaste.call(0);
    assert.equal(
      pasteData[0],
      CONTENT,
      "the content of the retrieved paste is not correct"
    );
    assert.equal(
      pasteData[1],
      USER,
      "the author of the retrieved paste is not correct"
    );
  });
});
