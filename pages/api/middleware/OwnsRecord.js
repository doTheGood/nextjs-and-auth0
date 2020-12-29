import auth0 from '../utils/auth0';
import { table } from '../utils/Airtable';

const ownsRecord = handler =>
  auth0.requireAuthentication(async (request, response) => {
    const { user } = await auth0.getSession(request);
    const { id } = request.body;

    try {
      const existingRecord = await table.find(id);

      if (!existingRecord || user.sub !== existingRecord.fields.userId) {
        response.statusCode = 404;
        return response.json({ msg: 'Record not found' });
      }

      request.record = existingRecord;
      return handler(request, response);
    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      return response.json({ msg: 'Something went wrong' });
    }
  });

export default ownsRecord;
