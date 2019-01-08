import injector from '@/Service';
import { ReflectiveInjector } from 'injection-js';
import { createContext } from 'react';

const ServiceContext = createContext<ReflectiveInjector>(injector);
export default ServiceContext;
