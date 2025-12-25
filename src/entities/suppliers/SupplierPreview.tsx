import { Spinner } from '@/components/ui';
import type { ISuppliers } from '@/models';
import { BasicLink } from '@/ui';

import { Flag } from '../shared';

interface SupplierPreviewProps {
  dataSuppliers: ISuppliers | undefined;
  supplierId: number | null;
}

const SupplierPreview: React.FC<SupplierPreviewProps> = ({
  dataSuppliers,
  supplierId,
}) => {
  const supplier = dataSuppliers?.find(
    (item) => item.supplierId === supplierId,
  );

  if (!supplier) {
    return (
      <span
        className="text-muted-foreground inline-flex items-center gap-2"
        title="Supplier"
      >
        {supplierId}
        <Spinner />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2" title="Supplier">
      <Flag country={supplier.country} />
      <BasicLink
        href={`/suppliers/${supplierId}`}
        className="grow basis-0 text-balance whitespace-normal"
      >
        {supplier.companyName}
      </BasicLink>
    </span>
  );
};

export default SupplierPreview;
