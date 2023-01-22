import { useEcosystemsStore } from "@/stores/ecosystems";

export const seed = () => {
  const store = useEcosystemsStore();

  function addEcosystem(
    name: string,
    width: number,
    length: number,
    height: number
  ) {
    const ecosystem = store.createNew();

    ecosystem.name = name;
    ecosystem.width.value = width;
    ecosystem.length.value = length;
    ecosystem.height.value = height;

    store.addNew(ecosystem);
  }

  addEcosystem("Living room", 30, 70, 35);
  addEcosystem("Fry tank", 20, 40, 20);
  addEcosystem("Hospital tank", 20, 30, 30);
};
