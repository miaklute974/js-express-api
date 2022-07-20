const db = require('./database')

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create story', async () => {
    expect.assertions(1);
    const story = await db.Story.create({
        id: 1,
        name: 'test story',
        type: 'feature'
    });
    expect(story.id).toEqual(1);
});

test('get story', async () => {
    expect.assertions(2);
    const story = await db.Story.findByPk(1);
    expect(story.name).toEqual('test story');
    expect(story.type).toEqual('feature');
});

test('delete story', async () => {
    expect.assertions(1);
    await db.Story.destroy({
        where: {
            id: 1
        }
    });
    const story = await db.Story.findByPk(1);
    expect(story).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});