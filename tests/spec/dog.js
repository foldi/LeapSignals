describe("A dog", function() {

  var obj;

  beforeEach(function() {
    obj = new Foothold.Dog('Hi');
  });

  afterEach(function() {

  });

  it("should have its required properties", function() {
    expect(typeof obj.msg).toEqual('string');
    expect(obj.name).toEqual('Dog');
  });

  it("should have a method speak() that accepts some text and returns a message.", function() {
    expect(obj.speak('kitty')).toEqual('From Dog: Hi, kitty.');
  });
});