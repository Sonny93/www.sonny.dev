const ServerError = ({ error }: { error: any }) => (
	<div className="container">
		<div className="title">Server Error</div>
		<span>{error.message}</span>
	</div>
);

export default ServerError;
