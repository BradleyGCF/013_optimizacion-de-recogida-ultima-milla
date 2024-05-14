import { createWithEqualityFn } from 'zustand/traditional';
import { storeUser } from '@/stores/user/storeUser';
import { storeTracking } from '@/stores/tracking/storeTracking';
import { storeTheme } from '@/stores/Actions/Theme/storeTheme';
import { storeHome } from '@/stores/Screens/storeHome';
import { storeModal } from '@/stores/Actions/modal/storeModal';
import { storeAlert } from '@/stores/Actions/alert/storeAlert';
import { storeChat } from '@/stores/Actions/chatStore/storeChat'
import { storeInventoryModal } from '@/stores/Actions/modal/storeInventoryModal'

export const useBoundStore = createWithEqualityFn((...a) => ({
	...storeUser(...a),
	...storeTheme(...a),
	...storeHome(...a),
	...storeAlert(...a),
	...storeModal(...a),
	...storeTracking(...a),
	...storeChat(...a),
	...storeInventoryModal(...a)
}));
