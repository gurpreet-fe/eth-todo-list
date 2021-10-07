const { assert } = require('chai');

const TodoList = artifacts.require('TodoList');

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it('Deploys successfully', async () => {
    const address = await this.todoList.address;

    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('Lists tasks', async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);

    assert.equal(task.id.toNumber(), taskCount.toNumber());
  });

  it('Creates tasks', async () => {
    const result = await this.todoList.createTask('A new task');
    const taskCount = await this.todoList.taskCount();
    const event = result.logs[0].args;

    assert.equal(taskCount, 2);
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, 'A new task');
    assert.equal(event.completed, false);
  });
});
