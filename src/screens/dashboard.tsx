import CardLink from '@/components/cards/card-link';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

const routes = [
	{
		path: '/dashboard/branch-office',
		text: 'Branch Office',
		active: true,
	},
	{
		path: '/dashboard/route-systems',
		text: 'Route System',
		active: true,
	},
	{
		path: '/dashboard/vehicles',
		text: 'Vehicles',
		active: true,
	},
	{
		path: '/dashboard/parcel-service',
		text: 'Parcel Service',
		active: false,
	},
	{
		path: '/dashboard/inventory',
		text: 'Inventory',
		active: false,
	},
	{
		path: '/dashboard/tracking',
		text: 'Tracking',
		active: false,
	},
];

export default function Home() {
	return (
		<Box
			sx={{
				maxWidth: '1200px',
				margin: 'auto',
			}}
		>
			<Grid container spacing={4}>
				{routes.map((route, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<CardLink to={route.path} active={route.active}>
							{route.text}
						</CardLink>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
