import * as React from 'react';
import { getToken } from '../../base/csrftoken';

const CSRFToken = () => (
  <input type="hidden" name="csrfmiddlewaretoken" value={getToken()} />
);

export default CSRFToken;
