import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AlertSuccess from '@/components/alert-success';
import { TransText } from '@/components';
import { useTrans } from '@/hooks/use-trans';

export function EventDetailHero({ event }) {
    const { flash } = usePage().props;
    const { t } = useTrans();
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/events/${event.id}/register`, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1600&q=80'})`,
                    }}
                />
                <div className="absolute inset-0 bg-cl-black/60" />
            </div>

            <div className="relative container py-16 lg:flex lg:gap-10 lg:py-24">
                <div className="flex-1">
                    <TransText
                        className="inline-flex items-center rounded-full bg-alpha px-4 py-1 text-xs font-semibold tracking-wide text-cl-white uppercase"
                        {...event.category}
                    />
                    <TransText
                        className="mt-4 text-3xl font-bold tracking-tight text-cl-white italic lg:text-4xl"
                        {...event.title}
                        as="h1"
                    />
                    <TransText
                        className="mt-4 text-sm leading-relaxed text-cl-white/80 lg:text-base"
                        {...event.description}
                        as="p"
                    />
                </div>

                <div className="mt-8 flex-1 rounded-2xl bg-cl-white p-6 shadow-xl lg:mt-0">
                    <div className="space-y-4 text-sm text-cl-black">
                        <div>
                            <p className="text-xs font-semibold tracking-wide text-cl-beta uppercase">
                                <TransText
                                    fr="Date & heure"
                                    ar="التاريخ والوقت"
                                    nl="Datum & tijd"
                                />
                            </p>
                            <span className="text-sm leading-none font-bold">
                                {new Date(event.date).toLocaleString(
                                    'default',
                                    {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric',
                                    },
                                )}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-wide text-cl-beta uppercase">
                                <TransText fr="Lieu" ar="المكان" nl="Locatie" />
                            </p>
                            <p className="mt-1 font-semibold">
                                {event.location}
                            </p>
                            <p className="text-xs text-cl-beta">{event.city}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <p className="text-sm font-bold text-alpha">
                                {event.price === 0 ? (
                                    <TransText
                                        fr="Gratuit"
                                        ar="مجاني"
                                        nl="Gratis"
                                    />
                                ) : (
                                    `${event.price}`
                                )}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="w-full rounded-full bg-alpha px-5 py-3 text-sm font-semibold tracking-wide text-cl-white uppercase transition hover:bg-alpha/90"
                        >
                            <TransText
                                fr="S'inscrire"
                                ar="التسجيل"
                                nl="Inschrijven"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <TransText
                                fr="S'inscrire à l'événement"
                                ar="التسجيل في الفعالية"
                                nl="Inschrijven voor het evenement"
                            />
                        </DialogTitle>
                        <DialogDescription>
                            <TransText
                                fr={`Remplissez vos informations pour vous inscrire à « ${t(event.title)} ».`}
                                ar={`املأ معلوماتك للتسجيل في « ${t(event.title)} ».`}
                                nl={`Vul uw gegevens in om u in te schrijven voor "${t(event.title)}".`}
                            />
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">
                                    <TransText
                                        fr="Prénom"
                                        ar="الاسم الأول"
                                        nl="Voornaam"
                                    />
                                </Label>
                                <Input
                                    id="first_name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                />
                                {errors.first_name && (
                                    <p className="text-sm text-destructive">
                                        {errors.first_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">
                                    <TransText
                                        fr="Nom"
                                        ar="اللقب"
                                        nl="Achternaam"
                                    />
                                </Label>
                                <Input
                                    id="last_name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                />
                                {errors.last_name && (
                                    <p className="text-sm text-destructive">
                                        {errors.last_name}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                <TransText
                                    fr="Téléphone"
                                    ar="الهاتف"
                                    nl="Telefoon"
                                />
                            </Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                <TransText
                                    fr="Annuler"
                                    ar="إلغاء"
                                    nl="Annuleren"
                                />
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? (
                                    <TransText
                                        fr="Inscription..."
                                        ar="جاري التسجيل..."
                                        nl="Inschrijven..."
                                    />
                                ) : (
                                    <TransText
                                        fr="Confirmer"
                                        ar="تأكيد"
                                        nl="Bevestigen"
                                    />
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertSuccess
                message={flash?.success}
                title="Inscription confirmée"
            />
        </section>
    );
}

export default EventDetailHero;
