import { Trans } from '@lingui/react/macro';

const NotFound = () => (
	<div className="container">
		<div className="title">
			<Trans>Page not found</Trans>
		</div>
		<span>
			<Trans>This page does not exist.</Trans>
		</span>
	</div>
);

export default NotFound;
