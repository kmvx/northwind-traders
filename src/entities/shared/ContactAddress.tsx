'use client';

import { MapPinIcon } from 'lucide-react';
import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import type { IAddress } from '@/models';
import { CopyButton, PropertyGrid } from '@/ui';
import { joinFields } from '@/utils';

import { Flag } from '.';

interface ContactAddressProps {
  address: IAddress;
  title?: string;
  className?: string;
}

const ContactAddress: React.FC<ContactAddressProps> = ({
  address,
  title,
  className,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const description = title ? title : 'Address';
  const items = [
    {
      name: 'Country',
      value: (
        <div className="flex items-center gap-2 font-bold">
          <Flag country={address.country} /> {address.country}
        </div>
      ),
      description: 'Country flag and name',
    },
    {
      name: 'Postal code',
      value: address.postalCode,
      description: 'Mailing code / ZIP',
    },
    {
      name: 'Region',
      value: address.region,
      description: 'Administrative subdivision (state/province/region)',
    },
    {
      name: 'City',
      value: address.city,
      description: 'City/Town/Village',
    },
    {
      name: 'Street address',
      value: address.address,
      description: 'Address (street, building, suite, etc.)',
    },
  ].filter((item) => Boolean(item.value));

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <div
          className={cn('flex items-center gap-2 font-bold', className)}
          title={description}
        >
          <div className="u-hue-green rounded-md p-2">
            <MapPinIcon className="size-4 min-w-4" />
          </div>
          <Flag country={address.country} />
          <div className="flex flex-col">
            <span className="text-balance">
              {joinFields(
                address.country,
                address.postalCode,
                address.region,
                address.city,
              )}
            </span>
            <span className="text-balance">{address.address}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="2xl:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{description}</DialogTitle>
          <DialogDescription>Complete address information</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60dvh] overflow-y-auto">
          <PropertyGrid items={items} />
        </div>
        <DialogFooter className="flex-row items-center justify-end">
          <CopyButton
            content={joinFields(
              address.country,
              address.postalCode,
              address.region,
              address.city,
              address.address,
            )}
          />
          <Button
            onClick={() => setIsOpenDialog(false)}
            type="submit"
            variant="outline"
            autoFocus
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactAddress;
