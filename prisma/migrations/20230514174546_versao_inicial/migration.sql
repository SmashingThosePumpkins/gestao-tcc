-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipo` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `ra` VARCHAR(191) NULL,
    `id_usuario` INTEGER NULL,
    `id_curso` INTEGER NULL,
    `termo` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunosProjeto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_aluno` INTEGER NULL,
    `id_projeto` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arquivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arquivo` LONGBLOB NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projeto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `id_orientador` INTEGER NULL,
    `id_curso` INTEGER NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjetosArquivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_projeto` INTEGER NULL,
    `id_arquivo` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ArquivoToProjeto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArquivoToProjeto_AB_unique`(`A`, `B`),
    INDEX `_ArquivoToProjeto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunosProjeto` ADD CONSTRAINT `AlunosProjeto_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `Aluno`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunosProjeto` ADD CONSTRAINT `AlunosProjeto_id_projeto_fkey` FOREIGN KEY (`id_projeto`) REFERENCES `Projeto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professor` ADD CONSTRAINT `Professor_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projeto` ADD CONSTRAINT `Projeto_id_orientador_fkey` FOREIGN KEY (`id_orientador`) REFERENCES `Professor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Projeto` ADD CONSTRAINT `Projeto_id_curso_fkey` FOREIGN KEY (`id_curso`) REFERENCES `Curso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjetosArquivo` ADD CONSTRAINT `ProjetosArquivo_id_projeto_fkey` FOREIGN KEY (`id_projeto`) REFERENCES `Projeto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjetosArquivo` ADD CONSTRAINT `ProjetosArquivo_id_arquivo_fkey` FOREIGN KEY (`id_arquivo`) REFERENCES `Arquivo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArquivoToProjeto` ADD CONSTRAINT `_ArquivoToProjeto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Arquivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArquivoToProjeto` ADD CONSTRAINT `_ArquivoToProjeto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Projeto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
