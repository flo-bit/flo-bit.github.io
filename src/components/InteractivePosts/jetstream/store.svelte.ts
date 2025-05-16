export const jetstreamStore: {
	messages: any[];
	connected: boolean;
	message: string;
	timeConnected: number;
	listeners: ((data: any) => void)[];
	active: string;
} = $state({
	messages: [],
	connected: false,
	message: '',
	timeConnected: 0,
	listeners: [],
	active: 'console',
});
