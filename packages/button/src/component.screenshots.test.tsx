import { Page } from 'playwright';
import {
    setupScreenshotTesting,
    customSnapshotIdentifier,
    generateTestCases,
    createSpriteStorybookUrl,
} from '../../screenshot-utils';

const screenshotTesting = setupScreenshotTesting({
    it,
    beforeAll,
    afterAll,
    expect,
});

const clip = { x: 0, y: 0, width: 200, height: 100 };

describe(
    'Button | views, sizes, disabled',
    screenshotTesting({
        cases: [
            [
                'sprite',
                createSpriteStorybookUrl({
                    componentName: 'Button',
                    size: { width: 200, height: 80 },
                    knobs: {
                        children: 'Оплатить',
                        view: ['primary', 'secondary', 'outlined', 'filled', 'link', 'ghost'],
                        size: ['xs', 's', 'm', 'l'],
                        disabled: [false, true],
                    },
                }),
            ],
        ],
        screenshotOpts: {
            fullPage: true,
        },
    }),
);

describe(
    'Button | screenshots views and block',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'filled', 'link', 'ghost'],
                block: true,
            },
        }),
    }),
);

/**
 * Скриншот для этого теста получается не информативным,
 * так как в самом начале анимации не видно лоадер.
 * Для того, чтобы скриншот был информативным, необходимо на сервере подождать какое-то время,
 * чтобы появился лоадер, а потом уже делать скриншот.
 */
describe(
    'Button | screenshots views and loading',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'filled', 'link', 'ghost'],
                loading: true,
            },
        }),

        matchImageSnapshotOptions: {
            failureThresholdType: 'pixel',
            failureThreshold: 5,
        },
        screenshotOpts: { clip },
    }),
);

describe(
    'Button | screenshots hover state',
    screenshotTesting({
        cases: generateTestCases({
            componentName: 'Button',
            knobs: {
                children: 'Оплатить',
                view: ['primary', 'secondary', 'outlined', 'filled', 'link', 'ghost'],
            },
        }),
        screenshotOpts: { clip },
        evaluate: (page: Page) => page.hover('button').then(() => page.waitForTimeout(500)),
        matchImageSnapshotOptions: {
            customSnapshotIdentifier: (...args) => `hover-${customSnapshotIdentifier(...args)}`,
        },
    }),
);