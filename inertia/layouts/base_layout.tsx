import '@minimalstuff/ui/style.css';
import 'virtual:uno.css';
import '~/css/app.css';

import React from 'react';
import { TuyauProvider } from '@adonisjs/inertia/react';

import { tuyauClient } from '~/lib/tuyau';

export const BaseLayout = ({ children }: React.PropsWithChildren) => (
	<TuyauProvider client={tuyauClient}>{children}</TuyauProvider>
);
