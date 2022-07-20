const db = require('./database')

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});


//******************Stories*****************//
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
