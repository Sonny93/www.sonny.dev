import { Trans } from '@lingui/react/macro';

const ServerError = ({ error }: { error: any }) => (
	<div className="container">
		<div className="title">
			<Trans>Server Error</Trans>
		</div>
		<span>{error.message}</span>
	</div>
);

export default ServerError;
