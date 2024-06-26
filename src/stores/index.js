import { createWithEqualityFn } from "zustand/traditional";
import { storeUser } from "@/stores/user/storeUser";
import { storeVehicles } from "@/stores/vehicles/storeVehicles";
import { storeBranch } from "@/stores/branch/storeBranch";
import { storeInventory } from "@/stores/inventory/storeInventory";
import { storeTracking } from "@/stores/tracking/storeTracking";
import { storeTheme } from "@/stores/Actions/Theme/storeTheme";
import { storeHome } from "@/stores/Screens/storeHome";
import { storeModal } from "@/stores/Actions/modal/storeModal";
import { storeAlert } from "@/stores/Actions/alert/storeAlert";
import { storeChat } from "@/stores/Actions/chatStore/storeChat";
import { storeInventoryModal } from "@/stores/Actions/modal/storeInventoryModal";
import { storeShipping } from "./shipping/storeShipping";

export const useBoundStore = createWithEqualityFn((...a) => ({
  ...storeUser(...a),
  ...storeTheme(...a),
  ...storeHome(...a),
  ...storeAlert(...a),
  ...storeModal(...a),
  ...storeTracking(...a),
  ...storeChat(...a),
  ...storeInventoryModal(...a),
  ...storeVehicles(...a),
  ...storeShipping(...a),
  ...storeBranch(...a),
  ...storeInventory(...a),
}));
