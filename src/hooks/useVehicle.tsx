import type { NewVehicle } from "@/schemas/index";
import { Moralis } from "moralis-v1";
import { useState } from "react";
import { toast } from "sonner";

export default function useVehicle() {
  const [loading, setLoading] = useState(false);
  const addVehicle = async (newVehicle: NewVehicle) => {
    setLoading(true);
    try {
      const result = await Moralis.Cloud.run("createVehicle", {
        objectData: newVehicle,
      });

      if (result.status !== "success") {
        toast.error("Error al agregar la sucursal");
        return {
          success: false,
        };
      }

      toast.success("Sucursal agregada correctamente");
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar la sucursal");
      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    addVehicle,
    loading,
  };
}
