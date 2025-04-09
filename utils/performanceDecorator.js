function measurePerformance(target, name, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
    const startTime = performance.now();
    const result = await originalMethod.apply(this, args);
    const endTime = performance.now();
    console.log(`Method ${name} took ${endTime - startTime} ms`);
    return result;
    };
    return descriptor;
    }

    module.exports = measurePerformance;