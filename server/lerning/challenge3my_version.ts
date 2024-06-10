interface LogEvent<T> {
    eventName: keyof T;
    payload: T[keyof T];
}

type ValidatorFunc<T> = (data: T[keyof T]) => boolean;
type Validators<T> = Record<keyof T, ValidatorFunc<T>>;
type MapFunc<T> = (data: T[keyof T]) => T[keyof T];
type Mappers<T> = Record<keyof T, MapFunc<T>>;

abstract class EventProcessor<T> {
    protected eventList: LogEvent<T>[] = [];
    protected validators: Validators<T> = <Validators<T>>{};
    protected mappers: Mappers<T> = <Mappers<T>>{};
    protected handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
        // if validator function for given eventName present and return true -> given event payload is valid for this type of event
        if (this.validators?.[eventName]?.(data)) {
            const payload = this.mappers?.[eventName]?.(data) ?? data;
            this.eventList.push({
                eventName,
                payload
            });
        }
    }

    addFilter<K extends keyof T>(
        eventName: K,
        filter: (data: T[keyof T]) => boolean
    ): void {
        this.validators[eventName] = filter;
    }

    addMap<K extends keyof T>(eventName: K, map: MapFunc<T>): void {
        this.mappers[eventName] = map;
    }

    protected abstract getProcessedEvents(): void;
}

interface ChallengeEventMap {
    registerUser: {
        user?: string;
        email?: string;
        name?: string;
        surname?: string;
        eId?: number;
    };
    login: {
        user?: string;
        name?: string;
        hasSession?: boolean;
        eId?: number;
    };
    logout: { user?: string; eId?: number };
    purchase: { email?: string; sku?: string; eId?: number };
}

class UserEventProcessor<T> extends EventProcessor<T> {
    private readonly userEvents: string[] = ['login', 'logout', 'registerUser'];

    public handleUserEvent<K extends keyof T>(eventName: K, data: T[K]): void {
        console.log('eventName: ', eventName);
        console.log('userEvents: ', this.userEvents);
        if (this.userEvents.includes(eventName as string)) {
            this.handleEvent(eventName, data);
        }
    }

    getProcessedEvents(): void {
        console.log('eventList: ', this.eventList);
    }
}

const uep = new UserEventProcessor<ChallengeEventMap>();

uep.addFilter(
    'login',
    (data: ChallengeEventMap['login']): boolean => !!data.user
);
uep.addFilter(
    'registerUser',
    (data: ChallengeEventMap['registerUser']) => !!data.email
);

uep.addMap(
    'login',
    (data: ChallengeEventMap['login']): ChallengeEventMap['login'] => ({
        ...data,
        hasSession: Boolean(data.user && data.name),
        eId: Math.floor(Math.random() * 10)
    })
);
uep.addMap(
    'registerUser',
    (
        data: ChallengeEventMap['registerUser']
    ): ChallengeEventMap['registerUser'] => ({
        ...data,
        email: data?.email ?? `${data.user}@wp.pl`,
        eId: Math.floor(Math.random() * 10)
    })
);
uep.addMap(
    'logout',
    (data: ChallengeEventMap['logout']): ChallengeEventMap['logout'] => ({
        ...data,
        eId: Math.floor(Math.random() * 10)
    })
);
uep.addMap(
    'purchase',
    (data: ChallengeEventMap['purchase']): ChallengeEventMap['purchase'] => ({
        ...data,
        eId: Math.floor(Math.random() * 10)
    })
);

uep.handleUserEvent('login', {
    name: 'Jack',
    user: 'jack23'
});
// uep.handleEvent('login', {
//     user: 'tom',
//     name: 'tomas'
// });
// uep.handleEvent('logout', {
//     user: 'tom'
// });
uep.handleUserEvent('purchase', {
    email: 'tom@wp.pl',
    sku: '23525235233'
});

console.log(uep.getProcessedEvents());

/*
  Result:
  [
    {
      eventName: 'login',
      data: { user: 'tom', name: 'tomas', hasSession: true }
    },
    { eventName: 'logout', data: { user: 'tom' } }
  ]
  */
