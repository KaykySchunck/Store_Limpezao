import { Item } from "@/@types/itens";
import { getItensService } from "@/services/itens.service";
import { useState, useEffect } from "react";

export function useGetItens(fk_idstore: string, fk_idcategory?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [itens, setItens] = useState<Item[]>([]);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const reloadItens = () => setReloadTrigger((prev) => prev + 1);

  useEffect(() => {
    const fetchItens = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getItensService(fk_idstore, fk_idcategory);
        setItens(result.itens || []);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (fk_idstore) {
      fetchItens();
    }
  }, [fk_idstore, fk_idcategory, reloadTrigger]);

  return { itens, setItens, loading, error, reloadItens };
}
