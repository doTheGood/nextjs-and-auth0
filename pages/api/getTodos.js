import { table, minifyRecords } from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (request, response) => {
  const { user } = await auth0.getSession();
  try {
    const records = await table
      .select({
        filterByFormula: `userId = '${user.sub}'`
      })
      .firstPage();
    const minifiedRecords = minifyRecords(records);
    response.statusCode = 200;
    response.json(minifiedRecords);
  } catch (error) {
    response.statusCode = 500;
    response.json({ msg: 'Something went wrong' });
  }
});
