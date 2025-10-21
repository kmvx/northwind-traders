export const createColumnHeader = (title: string) => {
  return function CreateColumnHeader() {
    return <div className="font-bold">{title}</div>;
  };
};
