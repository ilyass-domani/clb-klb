import { Form, Head, Link } from '@inertiajs/react';
// import type { ComponentType } from 'react';
import InputError from '@/components/input-error';
// import PageHero from '@/components/PageHero';

// const PageHeroTyped = PageHero as unknown as ComponentType<{
//     subtitle?: string;
//     title: string;
//     backgroundImage?: string;
// }>;
import { register } from '@/routes';
import { store } from '@/routes/login';

import { request } from '@/routes/password';
type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Connexion" />
            <section className="border-b border-border bg-background py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mx-auto max-w-md">
                        {status && (
                            <div className="mb-6 rounded-lg bg-primary/10 p-4 text-center text-sm font-medium text-foreground">
                                {status}
                            </div>
                        )}

                        <div className="rounded-xl border border-border bg-muted/50 p-6 shadow-sm lg:p-8">
                            <p className="mb-6 text-sm text-muted-foreground">
                                Entrez votre adresse e-mail et votre mot de passe pour accéder à votre compte.
                            </p>

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="flex flex-col gap-5"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-1 block text-sm font-medium text-foreground"
                                            >
                                                Adresse e-mail
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                autoComplete="email"
                                                placeholder="email@exemple.com"
                                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label
                                                    htmlFor="password"
                                                    className="mb-1 block text-sm font-medium text-foreground"
                                                >
                                                    Mot de passe
                                                </label>
                                                {canResetPassword && (
                                                    <Link
                                                        href={request()}
                                                        className="text-sm text-alpha hover:underline"
                                                    >
                                                        Mot de passe oublié ?
                                                    </Link>
                                                )}
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <input
                                                id="remember"
                                                name="remember"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-input text-alpha focus:ring-ring"
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="text-sm font-medium text-foreground"
                                            >
                                                Se souvenir de moi
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-2 w-full rounded-lg bg-alpha px-4 py-3 text-sm font-medium uppercase text-cl-white transition hover:opacity-95 disabled:opacity-70"
                                        >
                                            {processing ? 'Connexion...' : 'Se connecter'}
                                        </button>
                                    </>
                                )}
                            </Form>

                            {canRegister && (
                                <p className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                                    Pas encore de compte ?{' '}
                                    <Link href={register()} className="font-medium text-alpha hover:underline">
                                        S&apos;inscrire
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
