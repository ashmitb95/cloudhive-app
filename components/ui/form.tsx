import * as React from 'react';
import { useForm, UseFormProps, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Form as RadixForm } from '@radix-ui/themes'

interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    schema: z.ZodType<T>;
    onSubmit: SubmitHandler<T>;
    defaultValues?: UseFormProps<T>['defaultValues'];
    children: React.ReactNode;
}

export function Form<T extends FieldValues>({
    schema,
    onSubmit,
    defaultValues,
    children,
    className,
    ...props
}: FormProps<T>) {
    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('space-y-6', className)}
            {...props}
        >
            {typeof children === 'function' ? children(form) : children}
        </form>
    );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function FormField({ label, error, className, ...props }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input className={cn('w-full', className)} {...props} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export function FormTextarea({ label, error, className, ...props }: FormTextareaProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <textarea className={cn('w-full', className)} {...props} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}

export { RadixForm as Form } 