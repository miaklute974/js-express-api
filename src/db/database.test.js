const db = require('./database')

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});


//******************Stories*****************//
test('create story', async () => {
    expect.assertions(1);
    const story = await db.Story.create({
        story_id: 123,
        name: 'test story',
        story_type: 'feature',
        requester_name: 'Ben Sero',
        owner_name: 'Eric Steele',
        is_completed: 'true',
        external_links: 'https://google.com',
        epic_id: '123123',
        epic_name: 'ABC',
    });
    expect(story.id).toEqual(1);
});

test('get story', async () => {
    expect.assertions(9);
    const story = await db.Story.findByPk(1);
    expect(story.story_id).toEqual(123);
    expect(story.name).toEqual('test story');
    expect(story.story_type).toEqual('feature');
    expect(story.requester_name).toEqual('Ben Sero');
    expect(story.owner_name).toEqual('Eric Steele');
    expect(story.is_completed).toEqual('true');
    expect(story.external_links).toEqual('https://google.com');
    expect(story.epic_id).toEqual('123123');
    expect(story.epic_name).toEqual('ABC');
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



//******************uAuthTokens*****************//
// this is probably going to fail until i spin up a brand new postgres image with a migration
test('create oAuthtoken', async () => {
    expect.assertions(1);
    const oauthtoken = await db.oAuthToken.create({
        access_token: 'A_RfiOh50nop6t1UEYiX_W1ZpZI_kFfXfIacCogowYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4bTJXeC15SmN6WTl4WC05NFM5Ri1Rdw0165',
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        token_type: 'Bearer',
        expiry_date: 1658336336876
    });
    expect(oauthtoken.id).toEqual(1);
});

test('get oAuthtoken', async () => {
    expect.assertions(2);
    const oauthtoken = await db.oAuthToken.findByPk(1);
    expect(oauthtoken.access_token).toEqual('A_RfiOh50nop6t1UEYiX_W1ZpZI_kFfXfIacCogowYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4bTJXeC15SmN6WTl4WC05NFM5Ri1Rdw0165');
    expect(oauthtoken.scope).toEqual('https://www.googleapis.com/auth/spreadsheets');
});

test('delete oAuthtoken', async () => {
    expect.assertions(1);
    await db.oAuthToken.destroy({
        where: {
            id: 1
        }
    });
    const oauthtoken = await db.oAuthToken.findByPk(1);
    expect(oauthtoken).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
