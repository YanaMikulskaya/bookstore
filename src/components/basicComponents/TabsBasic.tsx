import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReactNode } from 'react';

type TabItem = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type TabsBasicType = {
  defaultValue: string;
  tabs: TabItem[];
  className?: string;
  onValueChange?: (value: string) => void;
};

export function TabsBasic({
  defaultValue,
  tabs,
  className,
  onValueChange,
}: TabsBasicType): React.ReactElement {
  return (
    <Tabs
      defaultValue={defaultValue}
      className={className}
      onValueChange={onValueChange}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
