import { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class GroqApi implements ICredentialType {
	name = 'groqApi';
	displayName = 'Groq Credentials';
	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.groq.com',
			url: '/openai/v1/models',
			method: 'GET',
			headers: {
				Authorization: '={{"Bearer "+$credentials.token}}',
			},
		},
	};
}
