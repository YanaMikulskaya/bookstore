import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';
import { HourglassIcon } from 'lucide-react';

type ToggleBasicProps = {
  icon?: React.ReactNode;
  text?: string;
  activeText?: string;
  isActive?: boolean;
  defaultActive?: boolean;
  onToggle?: (isActive: boolean) => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'accent';
};

export function ToggleBasic({
  icon,
  text = '',
  activeText = '',
  isActive: controlledIsActive,
  defaultActive = false,
  onToggle,
  isLoading = false,
  disabled = false,
  className = '',
  size = 'default',
  variant = 'default',
}: ToggleBasicProps) {
  const [internalIsActive, setInternalIsActive] = useState(defaultActive);
  const isActive =
    controlledIsActive !== undefined ? controlledIsActive : internalIsActive;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggle = async () => {
    if (disabled || isLoading || isProcessing) return;

    const newState = !isActive;

    if (controlledIsActive === undefined) {
      setInternalIsActive(newState);
    }

    setIsProcessing(true);

    try {
      await onToggle?.(newState);
    } catch (error) {
      console.error('Toggle failed:', error);
      if (controlledIsActive === undefined) {
        setInternalIsActive(isActive);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const defaultStyles = `    
    data-[state=on]:[&_svg]:fill-primary
    data-[state=on]:[&_svg]:text-primary
    data-[state=on]:bg-transparent
    hover:bg-transparent
    hover:[&_svg]:stroke-primary
  `;

  const accentStyles = `
    data-[state=on]:bg-white 
    data-[state=on]:text-primary 
    data-[state=on]:border-2 
    data-[state=on]:border-primary
    data-[state=on]:hover:bg-primary/10
    data-[state=on]:hover:text-primary/80
    bg-primary 
    border-2 
    border-primary
    text-primary-foreground 
    hover:bg-primary/80
    hover:text-white
  `;

  const variantStyles = variant === 'accent' ? accentStyles : defaultStyles;

  const isIconOnly = !text && !activeText;

  return (
    <Toggle
      size={size}
      pressed={isActive}
      onPressedChange={handleToggle}
      disabled={disabled || isLoading || isProcessing}
      className={`
        ${variantStyles}
        transition-all
        duration-200
        rounded-md
        gap-1.5
        ${isIconOnly ? 'px-1' : 'px-3'}
        ${isLoading || isProcessing ? 'opacity-50 cursor-wait' : ''}
        ${className}
      `}
    >
      {isLoading || isProcessing ? (
        <HourglassIcon className="h-4 w-4 animate-spin" />
      ) : (
        icon
      )}
      {!isIconOnly && (isActive ? activeText : text)}
    </Toggle>
  );
}
